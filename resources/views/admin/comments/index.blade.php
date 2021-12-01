@extends('admin.layout')

@section('content')
    <div class="content-wrapper">
        <section class="content-header">
            <h1>Комментарии</h1>
            <ol class="breadcrumb">
                <li><a href=""><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Комментарии</li>
            </ol>
        </section>

        <section class="content">

            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Управление комментариями</h3>
                </div>
                <div class="box-body">
                    @include('admin.errors')
                    <div class="form-group">
                        <a href="create.html" class="btn btn-success">Добавить</a>
                    </div>
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID поста</th>
                            <th>Текст</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($comments as $comment)
                            <tr>
                                <td>{{$comment->id}}</td>
                                <td>{{$comment->post_id}}</td>
                                <td>{{$comment->text}}</td>
                                <td>
                                    @if($comment->status == 1)
                                        <a href="/admin/comments/toggle/{{$comment->id}}" class="fa fa-lock"></a>
                                    @else
                                        <a href="/admin/comments/toggle/{{$comment->id}}" class="fa fa-thumbs-o-up"></a>
                                    @endif
                                    {{Form::open(['route'=>['comments.destroy', $comment->id], 'method'=>'delete'])}}
                                    <button onclick="return confirm('Вы уверены, что хотите удалить комментарий?')" type="submit" class="delete">
                                        <i class="fa fa-remove"></i>
                                    </button>

                                    {{Form::close()}}
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </table>
                </div>

            </div>

        </section>

    </div>

@endsection
