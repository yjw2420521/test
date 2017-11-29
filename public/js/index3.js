$(function(){
    $('#lianxikf').on('click',function(){
        console.log($('#ordernum').val());
        console.log($('#fankuinr').val());
         $.post({
             url: '/api/user/fankui',
             dataType:'json',
               data:{
                orderid:$('#ordernum').val(),
                fankuinr:$('#fankuinr').val(),
              },
             success : function(rs){
                  if(rs.code){
                        alert(rs.message);
                  }
             }
         })
     })
})