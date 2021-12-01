@extends('admin.layout')

@section('content')
    <div class="content-wrapper">
        <section class="content-header">
            <h1>Тэги</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Тэги</li>
            </ol>
        </section>

        <section class="content">

            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Управление тегами</h3>
                </div>
                <div class="box-body">
                    @include('admin.errors')
                    <div class="form-group">
                        <a href="{{route('tags.create')}}" class="btn btn-success">Добавить</a>
                    </div>
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($tags as $tag)
                            <tr>
                                <td>{{$tag->id}}</td>
                                <td>{{$tag->title}}</td>
                                <td><a href="{{route('tags.edit', $tag->id)}}" class="fa fa-pencil"></a>
                                    {{Form::open(['route'=>['tags.destroy', $tag->id], 'method'=>'delete'])}}
                                    <button onclick="return confirm('Вы уверены, что хотите удалить тег {{$tag->title}}}?')" type="submit" class="delete">
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
