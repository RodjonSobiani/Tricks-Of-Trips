@extends('main.blog.layout')

@section('content')
    <div class="main-content">
        <div class="container">
            <div class="row">
                <div class="col-md-8">

                    <div id="form" class="leave-comment mr0">
                        <h3 id="register-form" class="text-uppercase">Регистрация</h3>
                        <br>
                        <form class="register form-horizontal contact-form" role="form" method="post" action="/auth/register">
                            {{csrf_field()}}
                            <div class="form-group">
                                <div class="col-md-12">
                                    <input type="text" class="form-control" id="login" name="login"
                                           placeholder="Логин*" value="{{old('login')}}">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    <input type="text" class="form-control" id="name" name="name"
                                           placeholder="Имя (например, ФИО)" value="{{old('name')}}">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    <input type="text" class="form-control" id="email" name="email"
                                           placeholder="Электронная почта*" value="{{old('email')}}">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    <input type="password" class="form-control" id="password" name="password"
                                           placeholder="Пароль*">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    <input type="password" class="form-control" id="password_confirmation" name="password_confirmation"
                                           placeholder="Подтвердите свой пароль*">
                                </div>
                            </div>
                            <button id="register" type="submit" class="btn send-btn">Регистрация</button>

                        </form>
                    </div>
                </div>
                @include('main.blog._sidebar')
            </div>
        </div>
    </div>

@endsection
