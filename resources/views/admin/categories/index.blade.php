@extends('admin.layout')
@section('content')
    <div class="content-wrapper">
        <section class="content-header">
            <h1>Категории</h1>
            <ol class="breadcrumb">
                <li><a href="{{ url('admin') }}"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Категории</li>
            </ol>
        </section>
        <section class="content">
            <div class="box">
                <div class="box-header"><h3 class="box-title">Управление категориями</h3></div>
                <div class="box-body">
                    @include('admin.errors')
                    <div class="form-group">
                        <a href="{{route('categories.create')}}" class="btn btn-success">Добавить</a>
                    </div>
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                        <tr><th>ID</th><th>Название</th><th>Действия</th></tr>
                        </thead>
                        <tbody>
                        @foreach($categories as $category)
                            <tr>
                                <td>{{$category->id}}</td>
                                <td>{{$category->title}}</td>
                                <td><a href="{{route('categories.edit', $category->id)}}" class="fa fa-pencil"></a>
                                    {{Form::open(['route'=>['categories.destroy', $category->id], 'method'=>'delete'])}}
                                    <button onclick="return confirm('Вы уверены?')" type="submit" class="delete">
                                        <i class="fa fa-remove"></i>
                                    </button>
                                    {{Form::close()}}
                                </td>
                            </tr>
                        @endforeach
                    </table>
                </div>
            </div>
        </section>
    </div>
@endsection
