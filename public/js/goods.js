$(function(){
     $('.comment').find('button').on('click',function(){
         console.log('------------点击获取的信息')
         console.log($('textarea').val());
         console.log($('#yonghu').text());
           $.ajax({
            type: 'post',
            url:'/api/goods/comment',
            data:{
                gid:$('#gid').text(),
                gname:$('#gname').text(),
                gusername:$('.yonghu').text(),
                text:$('textarea').val()
            },
            dataType:'json',
            success:function(result){
                   alert(result.message);
                   window.location.reload();
            }
        }); 
     })
      
      $('.gouwuche').find('button').on('click',function(){
        //通过ajax提交请求
       
        $.ajax({
            type: 'post',
            url:'/goods/goods/tianjia',
            data:{
                gname:$('#gname').text(),
                gnum:$('#gnum').text(),
                gprice:$('#gprice').text(),
                gusername:$('#gusername').text()
            },
            dataType:'json',
            success:function(result){
                console.log(result);
                if(result.code = 3){
                       alert(result.message);
                }else if(result.code = 4 ){
                       alert(result.message);
                }
            }
        });
    })
})