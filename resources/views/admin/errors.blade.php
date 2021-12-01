@if ($errors->any())
    <div id="warning" class="alert alert-warning alert-dismissible" role="alert">
        <h4 class="alert-heading pull-left">Ошибка!</h4>
        <button id="closeButton" type="button" class="close pull-right" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button><br/>
        <hr/>
        @foreach ($errors->all() as $error)
            {{ $error }} <br/>
        @endforeach
    </div>
@endif
@if(session('status'))
    <div id="info" class="alert alert-info alert-dismissible" role="alert">
        <h4 class="alert-heading pull-left">Информация:</h4>
        <button id="closeButton" type="button" class="close pull-right" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <br/>
        <hr/>
        <p>{{session('status')}}</p>
    </div>
@endif
