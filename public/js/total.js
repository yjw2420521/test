var total = 0;

function getTotal(){
    // for(var i = 0; i <= items; i++){
    //     var price = $(tr).find('#price').text();
    //     var num = $(tr).find('#num').val();
    //     total += price * num;
    // }
    // console.log(total);
    // return total;
    total = 0;
    $('.data').each(function(i,ele){
        
        var price = $(ele).find('#price').text();
        var num = $(ele).find('.num').val();
        // console.log(i + price + num)
        total += parseInt(price) * num;
        // console.log('1')
        
    })
}
$(function(){
getTotal();
$('#total').text(total);
$('.num').on('change',function(){
    getTotal();
    $('#total').text(total);
})

$('#btn-total').click(function(){
    
    getTotal();
    alert(total);
    total = 0;
})

$('#btn-exit').click(function(){
    window.location.href = '/'
})
  $('#otijiao').on('click',function(){
        //通过ajax提交请求
       console.log($('.modal-body').find('[name="orderid"]').val());
       console.log($('#fanhui').text());
        $.ajax({
            type: 'post',
            url:'/api/order/tianjia',
            data:{
                username:$('#fanhui').text(),
                gname:$('#gname').text(),
                price:$('#price').text(),
                orderid:$('.modal-body').find('[name="orderid"]').val(),
                adress:$('.modal-body').find('[name="adr"]').val(),
                pnum:$('.modal-body').find('[name="pnum"]').val(),
                qnum:$('.modal-body').find('[name="qnum"]').val(),
                totalprice:$("#total").text()
            },
            dataType:'json',
            success:function(result){
                console.log(result);
                if(result.code){
                       alert(result.message);
                       
                }else{
                       alert(result.message);
                }
                window.location.reload();
            }
        });
    })
})