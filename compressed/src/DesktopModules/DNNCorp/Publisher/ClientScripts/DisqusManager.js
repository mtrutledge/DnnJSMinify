window.dnn=dnn||{},window.dnn.modules=dnn.modules||{},window.dnn.modules.publisher=dnn.modules.publisher||{},window.dnn.modules.publisher.DisqusManager=function(){"use strict";var requestService,getRequestService,notifyAboutNewComment;return getRequestService=function(){return requestService||(requestService=dnn.modules.publisher.RequestUtils),requestService},notifyAboutNewComment=function(contentItemId){getRequestService().request("Publisher","ViewPost","NotifyAboutNewComment","POST",{contentItemId:contentItemId})},{notifyAboutNewComment:notifyAboutNewComment}}();