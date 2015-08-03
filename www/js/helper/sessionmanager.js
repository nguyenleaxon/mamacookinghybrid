angular.module("sessionmanager", [])
    .service("SessionManagerService", function ($log,localStorageService) {

        this.isCategoryStoreInSession = function (key){
            return localStorageService.get(key) == null ? false:true;

        }

        this.storeVideoInSession = function(categoryID,videos,skip,total) {
            var videoSession = {};
            videoSession._skip = skip;
            videoSession._total = total;
            videoSession._videos = videos;
            localStorageService.set(categoryID,videoSession);

        }

        this.getPlaceBySession = function(categoryID) {
            return localStorageService.get(categoryID);

        }

    }
)