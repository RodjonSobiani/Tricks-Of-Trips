@extends('admin.layout')

@section('content')
    <div class="content-wrapper">
        <section class="content-header">
            <h1>
                Blank page
                <small>it all starts here</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><a href="#">Examples</a></li>
                <li class="active">Blank page</li>
            </ol>
        </section>
        <section class="content">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Листинг сущности</h3>
                </div>
                <div class="box-body">
                    <div class="form-group">
                        <a href="{{route('adventures.create')}}" class="btn btn-success">Добавить</a>
                    </div>
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Описание</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($adventures as $adventure)
                            <tr>
                                <td>{{$adventure->id}}</td>
                                <td>{{$adventure->title}}</td>
                                <td>{{$adventure->content}}</td>
                                <td><a href="{{route('adventures.edit', $adventure->id)}}" class="fa fa-pencil"></a>

                                    {{Form::open(['route'=>['adventures.destroy', $adventure->id], 'method'=>'delete'])}}
                                    <button onclick="return confirm('Вы уверены?')" type="submit" class="delete">
                                        <i class="fa fa-remove"></i>
                                    </button>

                                    {{Form::close()}}
                                </td>
                            </tr>
                        @endforeach

                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
    </div>
@endsection
