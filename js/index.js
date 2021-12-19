$('.btn_click').click(function(){

    let div=document.createElement("div");
    div.className='test';

    let text=document.createTextNode('test');
    div.appendChild(text);
    document.body.appendChild(div);


    var url='/PLUGINS/test/test.html';
    var iframe='<iframe src="'+url+'">';

    $('.div_iframe').html(iframe);
});

$('.btn_click2').click(function(){
    
});

// main-box