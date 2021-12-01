@extends('admin.layout')

@section('content')
    <div class="content-wrapper">
        <section class="content-header"><h1>Посты</h1></section>

        <section class="content">
            {{Form::open([
                'route' => 'posts.store',
                'files' => true
            ])}}
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Управление постами</h3>
                </div>
                <div class="box-body">
                    @include('admin.errors')
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="adminPostTitle">Название</label>
                            <input type="text" class="form-control" id="adminPostTitle"
                                   name="title" value="{{old('title')}}" placeholder="">
                        </div>

                        <div class="form-group">
                            <label for="adminPostCover">Лицевая картинка</label>
                            <input type="file" name="image" id="adminPostCover">

                            <p class="help-block">jpg, jpeg, png, bmp, gif, svg, или webp</p>
                        </div>
                        <div class="form-group">
                            <label>Категория</label>
                            {{Form::select('category_id',
                                $categories,
                                null,
                                ['class' => 'form-control select2'])
                            }}
                        </div>
                        <div class="form-group">
                            <label>Теги</label>
                            {{Form::select('tags[]',
                                $tags,
                                null,
                                ['class' => 'form-control select2', 'multiple'=>'multiple',
                                'data-placeholder'=>' Выберите теги'])
                            }}

                        </div>

                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="featured" class="minimal" name="is_featured">
                            </label>
                            <label>
                                Рекомендовать
                            </label>
                        </div>

                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="drafted" class="minimal" name="status">
                            </label>
                            <label>
                                Черновик
                            </label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="adminPostDescription">Описание</label>
                            <textarea name="description" id="adminPostDescription" cols="30" rows="10"
                                      class="form-control">{{old('description')}}</textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="summernote">Полный текст</label>
                            <textarea name="content" id="summernote" cols="30" rows="10"
                                      class="form-control"></textarea>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <a href="{{route('posts.index')}}" class="btn btn-default">Назад</a>
                    <button class="btn btn-success pull-right">Добавить</button>
                </div>
            </div>
            {{Form::close()}}
        </section>
    </div>
@endsection
