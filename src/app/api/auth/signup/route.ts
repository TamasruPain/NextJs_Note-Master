import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/adminModel';

export async function POST(request: Request) {
    // get data from request body
    const { name, email, password, confirmPassword, role } = await request.json();

    // checking for validations 
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    if (!name || !email || !password || !confirmPassword) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
        return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }
    if (confirmPassword !== password) {
        return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }
    if (password.length < 6) {
        return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // checking for existing user and save user
    try {
        await connectDB();
        if (role === 'admin') {
            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                return NextResponse.json({ message: 'Admin email already exists' }, { status: 400 });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = new Admin({
                name,
                email,
                password: hashedPassword,
                role: 'admin',
            });
            await newAdmin.save();
            return NextResponse.json({ message: 'Admin created successfully' }, { status: 201 });
        } else {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role: role || 'user'
            });
            await newUser.save();
            return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}