@extends('admin.layout')
@section('content')
    <div class="content-wrapper">
        <section class="content-header"><h1>Пользователи</h1></section>
        <section class="content">
        {{Form::open(['route' => 'users.store', 'files' => true])}}
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Добавить нового пользователя</h3>
                </div>
                <div class="box-body">
                    @include('admin.errors')
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="login">Логин</label>
                            <input type="text" name="login" class="form-control" id="login"
                                   placeholder="" value="{{old('login')}}">
                        </div>
                        <div class="form-group">
                            <label for="name">Имя</label>
                            <input type="text" name="name" class="form-control" id="name"
                                   placeholder="" value="{{old('name')}}">
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input type="text" name="email" class="form-control" id="email"
                                   placeholder="" value="{{old('email')}}">
                        </div>
                        <div class="form-group">
                            <label for="about">О себе</label>
                            <input type="text" name="about" class="form-control" id="about"
                                   placeholder="" value="{{old('about')}}">
                        </div>
                        <div class="form-group">
                            <label for="password">Пароль</label>
                            <input type="password" name="password" class="form-control" id="password"
                                   placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputFile">Аватар</label>
                            <input type="file" name="avatar" id="exampleInputFile">
                            <p class="help-block">jpg, jpeg, png, bmp, gif, svg, или webp</p>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <a href="{{route('users.index')}}" class="btn btn-default">Назад</a>
                    <button class="btn btn-success pull-right">Добавить</button>
                </div>
            </div>
        </section>
    </div>
@endsection
