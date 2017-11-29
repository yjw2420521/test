$(function() {
 $('#wsx').on('click',function(){
     console.log($('.ws').find('[name="pnum"]').val());
         $.post({
             url: '/api/user/wss',
             dataType:'json',
               data:{
                pnum:$('.ws').find('[name="pnum"]').val(),
                qnum:$('.ws').find('[name="qnum"]').val(),
                email:$('.ws').find('[name="email"]').val(),
              },
             success : function(rs){
                if (rs.code = 11) {
                     alert(rs.message);
                }else if(rs.code = 12){
                     alert(rs.message);
                }else if(rs.code = 13){
                     alert(rs.message);
                }

             }
         })
     })
     
})