@extends('admin.layout')

@section('content')
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                Все посты
                <small></small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="{{url('admin')}}"><i class="fa fa-dashboard"></i> Главная</a></li>
                <li class="active">Все посты</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
        <!-- Default box -->
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Все посты</h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    @include('admin.errors')

                    <div class="form-group">
                        <a href="{{route('posts.create')}}" class="btn btn-success">Добавить</a>
                    </div>
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Категория</th>
                            <th>Теги</th>
                            <th>Описание</th>
{{--                            <th>Текст</th>--}}
                            <th>Картинка</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($posts as $post)
                        <tr>
                            <td>{{$post->id}}</td>
                            <td>{{$post->title}}</td>
                            <td>{{$post->getCategoryTitle()}}</td>
                            <td>{{$post->getTagsTitles()}}</td>
                            <td>{{$post->description}}</td>
{{--                            <td>{{$post->content}}</td>--}}
                            <td>
                                <img src="{{$post->getImage()}}" alt="Изображение к посту" width="100">
                            </td>
                            <td><a href="{{route('posts.edit', $post->id)}}" class="fa fa-pencil"></a>
                                {{Form::open(['route'=>['posts.destroy', $post->id], 'method'=>'delete'])}}
                                <button onclick="return confirm('Вы уверены, что хотите удалить пост {{$post->title}}?')" type="submit" class="delete">
                                    <i class="fa fa-remove"></i>
                                </button>
                                {{Form::close()}}
                            </td>
                        </tr>
                        @endforeach
                        <tfoot>
                        </tfoot>
                    </table>
                </div>
                <!-- /.box-body -->
            </div>
            <!-- /.box -->
        </section>
        <!-- /.content -->
    </div>
@endsection
