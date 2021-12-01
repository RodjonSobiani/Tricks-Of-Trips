<div class="col-md-4" data-sticky_column>
    <div class="sidebar">
        <aside class="widget">
            <div class="text-center">
                <form action="{{route('search')}}" method="GET" class="form-inline my-2 my-lg-0">
                    <div class="row">
                        <input type="text" class="form-control" name="q" value="{{ old('q') }}" placeholder="Поиск" required>
                        <input class="btn btn-info" type="submit" value="Искать">
                    </div>
                </form>
            </div>
        </aside>
        <aside class="widget news-letter">
            <h3 class="widget-title text-uppercase text-center">Подписаться на рассылку</h3>
            <form class="subscribe" action="/blog/subscribe" method="post">
                {{csrf_field()}}
                <input class="form-control mr-sm-2" type="text" placeholder="Ваш email адрес" name="email">
                <input type="submit" value="Подписаться"
                       class="text-uppercase text-center btn btn-subscribe" style="margin-top: 5px;">
            </form>
        </aside>
        <aside class="widget pos-padding">
            <h3 class="widget-title text-uppercase text-center">Популярные посты</h3>
            @foreach($popularPosts as $post)
                <div class="popular-post">
                    <a href="{{route('post.show', $post->slug)}}" class="popular-img">
                        <img src="{{$post->getImage()}}" alt="{{$post->slug}}">

                        <div class="p-overlay"></div>
                    </a>
                    <div class="p-content">
                        <a href="{{route('post.show', $post->slug)}}" class="text-uppercase">{{$post->title}}</a>
                        <span class="p-date">{{Date::parse($post->created_at)->format('d F Y г. | H:i')}}</span>
                    </div>
                </div>
            @endforeach
        </aside>
        <aside class="widget">
            <h3 class="widget-title text-uppercase text-center">Рекомендованные посты</h3>
            <div id="widget-feature" class="owl-carousel">
                @foreach($featurePosts as $post)
                    <div class="item">
                        <div class="feature-content">
                            <img src="{{$post->getImage()}}" style="object-fit: cover; min-height: 300px;" alt="{{$post->slug}}">
                            <a href="{{route('post.show', $post->slug)}}" class="overlay-text text-center">
                                <h5 class="text-uppercase">{{$post->title}}</h5>
                                <p>{{$post->description}}</p>
                            </a>
                        </div>
                    </div>
                @endforeach
            </div>
        </aside>
        <aside class="widget pos-padding">
            <h3 class="widget-title text-uppercase text-center">Недавние посты</h3>
            @foreach($recentPosts as $post)
                <div class="popular-post">
                    <a href="{{route('post.show', $post->slug)}}" class="popular-img">
                        <img src="{{$post->getImage()}}" alt="{{$post->slug}}">
                        <div class="p-overlay"></div>
                    </a>
                    <div class="p-content">
                        <a href="{{route('post.show', $post->slug)}}" class="text-uppercase">{{$post->title}}</a>
                        <span class="p-date">{{Date::parse($post->created_at)->format('d F Y г. | H:i')}}</span>
                    </div>
                </div>
            @endforeach
        </aside>
        <aside class="widget border pos-padding">
            <h3 class="widget-title text-uppercase text-center">Категории</h3>
            <ul>
                @foreach($categories as $category)
                    @if($category->posts()->count() != 0)
                    <li>
                        <a href="{{route('category.show', $category->slug)}}">{{$category->title}}</a>
                        <span class="post-count pull-right"> ({{$category->posts()->count()}})</span>
                    </li>
                    @endif()
                @endforeach
            </ul>
        </aside>
    </div>
</div>
