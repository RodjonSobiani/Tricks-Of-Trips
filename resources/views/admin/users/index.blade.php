@extends('admin.layout')
@section('content')
    <div class="content-wrapper">
        <section class="content-header">
            <h1>Пользователи</h1>
            <ol class="breadcrumb">
                <li><a href="{{ url('admin') }}"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Пользователи</li>
            </ol>
        </section>
        <section class="content">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Управление пользователями</h3>
                </div>
                <div class="box-body">
                    @include('admin.errors')
                    <div class="form-group">
                        <a href="{{route('users.create')}}" class="btn btn-success">Добавить</a>
                    </div>
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Логин</th>
                            <th>Имя</th>
                            <th>E-mail</th>
                            <th>О себе</th>
                            <th>Аватар</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($users as $user)
                            <tr>
                                <td>{{$user->id}}</td>
                                <td>{{$user->login}}</td>
                                <td>{{$user->name}}</td>
                                <td>{{$user->email}}</td>
                                <td>{{$user->about}}</td>
                                <td>
                                    <img src="{{$user->getImage()}}" alt="Аватар" class="img-responsive" width="150">
                                </td>
                                <td><a href="{{route('users.edit', $user->id)}}" class="fa fa-pencil"></a>
                                    {{Form::open(['route'=>['users.destroy', $user->id], 'method'=>'delete'])}}
                                    <button onclick="return confirm('Вы уверены, что хотите удалить пользователя &quot;{{$user->login}}&quot;?')" type="submit" class="delete">
                                        <i class="fa fa-remove"></i>
                                    </button>

                                    {{Form::close()}}</td>
                            </tr>
                        @endforeach
                        <tfoot>
                        </tfoot>
                    </table>
                </div>
            </div>

        </section>
    </div>
@endsection
