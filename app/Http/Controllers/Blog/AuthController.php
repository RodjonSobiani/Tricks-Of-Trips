<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function registerForm()
    {
        return view('main.blog.register');
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'login' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers(),
            ],
            'password_confirmation' => 'required'
        ]);

        $user = User::add($request->all());
        $user->generatePassword($request->get('password'));

        return redirect('/auth/login')->with('status', 'Регистрация прошла успешно, теперь вы можете войти в систему.');
    }

    public function loginForm()
    {
        return view('main.blog.login');
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if(Auth::attempt([
            'email' => $request->get('email'),
            'password' => $request->get('password')
        ]))
        {
            return redirect('/blog');
        }
        return redirect()->back()->with('status', 'Неправильный логин или пароль.');
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/blog');
    }
}
