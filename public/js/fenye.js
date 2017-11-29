 window.onload = function(){
            page({
                id:"div1",
                NowNum : 4,
                allNum : 6,
                callback : function(now,all){
                 var div2 = document.createElement('div');
                 div2.style.width = '250px;';
                 div2.style.height = '350px';
                 
                }
            });
        };
        function page(opt){
            if(!opt.id){return false};
            var obj = document.getElementById(opt.id);
            var NowNum = opt.NowNum || 1;
            var allNum = opt.allNum || 5;
            var callback = opt.callback || function(){};
            if(NowNum >= 4 && allNum >=6){
                 var oA = document.createElement('a');
                 oA.href = '#1';
                 oA.innerHTML = '首页';
                 obj.appendChild(oA);
            }
            if(NowNum >= 2){
                var oA = document.createElement('a');
                oA.href = '#' + (NowNum - 1);
                oA.innerHTML =  '上一页';
                obj.appendChild(oA);
            }
            if(allNum<=5){
              for(var i=1;i<=allNum;i++){
                  var oA = document.createElement("a");
                  oA.href = '#' +  i;
                  if(NowNum == i){
                    oA.innerHTML = i;
                  }else{
                  oA.innerHTML = '[' + i + ']';
                  }
                  obj.appendChild(oA);
              }
            }else{
                for(var i = 1; i<=5; i++){
                    var oA = document.createElement("a");
                    if(NowNum == 1 || NowNum == 2){
                         oA.href = '#' + i;
                         if(NowNum == i){
                              oA.innerHTML = i;
                         }else{
                         oA.innerHTML = '[' + i + ']';
                        }
                        }
                         else if((allNum - NowNum) == 0 ||(allNum - NowNum) == 1){
                                oA.href = '#' + (allNum - 5 + i);
                                   if((allNum - NowNum) == 0 && i == 5){
                                    oA.innerHTML = (allNum - 5 + i);
                                }
                                else if((allNum - NowNum) == 1 && i == 4){
                                    oA.innerHTML = (allNum - 5 + i);
                                }
                                else{
                                    oA.innerHTML = '[' + (allNum - 5 + i) + ']';
                                    }
                         }
                         else
                         {
                        oA.href = '#' + (NowNum - 3 + i);
                        if(i == 3)
                        {
                        oA.innerHTML = (NowNum - 3 + i);
                        }else
                        {
                        oA.innerHTML = '[' + (NowNum - 3 + i) + ']';
                         }
                      }
                    obj.appendChild(oA);
                }
            }
            if((allNum - NowNum) >= 1){
                 var oA = document.createElement('a');
                 oA.href = '#' + (NowNum + 1);
                 oA.innerHTML = '下一页';
                 obj.appendChild(oA);
            }
            if((allNum - NowNum) >= 3 && allNum >= 6){
                var oA = document.createElement('a');
                 oA.href = '#' + allNum;
                 oA.innerHTML = '尾页';
                 obj.appendChild(oA);
            }
            
            callback(NowNum,allNum);

            var aA = obj.getElementsByTagName('a');
               
               for(var i = 0;i < aA.length;i++){
                   aA[i].onclick = function(){
                       var NowNum = parseInt(this.getAttribute('href').substring(1));
                       obj.innerHTML = '';
                       page({
                           id:opt.id,
                           NowNum : NowNum,
                           allNum : allNum,
                           callback : callback
                       });
                   };
               }

        } 