var inputVal = document.querySelector(".js-userinput");
inputVal.addEventListener("keyup",function (event) { 
    if(event.keyCode===13){
        document.querySelector(".js-container").innerHTML="";
        AjaxRequest(inputVal.value);
        inputVal.value="";
    }
});
var searchBtn = document.querySelector(".js-go");
searchBtn.addEventListener("click",function () { 
    document.querySelector(".js-container").innerHTML="";
    AjaxRequest(inputVal.value);
    inputVal.value="";
});

// Ajax Request
function AjaxRequest(value) { 
    let url = "http://api.giphy.com/v1/gifs/search?q="+value+"&api_key=Iu4evtxlLepbm9XrWxgWY7YnztgWS3st";
    let gifAjax = new XMLHttpRequest();
    gifAjax.open('GET',url,true);
    gifAjax.send();
    gifAjax.onreadystatechange=function () { 
        if(gifAjax.status===200 && gifAjax.readyState===4){
            console.log("request success!");
            gifAjax.addEventListener('load',function (e) { 
                var result = e.target.response;
                var data = JSON.parse(result);
                AddToList(data);
            })
        }else if(gifAjax.readyState===4){
            console.log("request failed...");
        }
    }
}

// Add Result to List
function AddToList(dataArray) { 
    for(var i=0;i<dataArray.data.length;i++)
    {
        var img = document.createElement("img");
        img.src=dataArray.data[i].images.fixed_height.url;
        img.className="container-image";
        document.querySelector(".js-container").appendChild(img);
    }
}
