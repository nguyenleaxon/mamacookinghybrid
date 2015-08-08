angular.module("sessionmanager", [])
    .service("SessionManagerService", function ($log,localStorageService) {

        this.isCategoryStoreInSession = function (key){
            return localStorageService.get(key) == null ? false:true;

        }

        this.storeVideoInSession = function(categoryID,value) {
            var video ={};
            video.noMoreItemsAvailable = value.noMoreItemsAvailable;
            video.videos = value.videos;
            video.firstTime = value.firstTime;
            video.skip = value.skip;
            video.total = value.total;
            localStorageService.set(categoryID,video);

        }

        this.getVideoBySession = function(categoryID) {
            return localStorageService.get(categoryID);

        }

        this.addVideoToFavourist = function(video) {
            //push array
        }

        this.getAllVideoFromFavourist = function() {
            return localStorageService.get("favorist");
        }

    }
)