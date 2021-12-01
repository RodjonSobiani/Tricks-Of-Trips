@extends('admin.layout')

@section('content')

    <div class="content-wrapper">

        <section class="content-header">
            <h1>Подписчики</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Подписчики</li>
            </ol>
        </section>

        <section class="content">

            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Управление подписчиками</h3>
                </div>

                <div class="box-body">
                    @include('admin.errors')
                    <div class="form-group">
                        <a href="{{route('subscribers.create')}}" class="btn btn-success">Добавить</a>
                    </div>
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($subs as $subscriber)
                            <tr>
                                <td>{{$subscriber->id}}</td>
                                <td>{{$subscriber->email}}
                                </td>
                                <td>
                                    {{Form::open(['route'=>['subscribers.destroy', $subscriber->id], 'method'=>'delete'])}}
                                    <button onclick="return confirm('Вы уверены, что хотите удалить подписчика?')"
                                            type="submit" class="delete">
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

            </div>

        </section>

    </div>

@endsection
