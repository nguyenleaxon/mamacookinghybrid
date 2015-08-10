angular.module("sessionmanager", [])
    .service("SessionManagerService", function ($log, localStorageService) {

        this.isCategoryStoreInSession = function (key) {
            return localStorageService.get(key) == null ? false : true;

        }

        this.storeVideoInSession = function (categoryID, value) {
            var video = {};
            video.noMoreItemsAvailable = value.noMoreItemsAvailable;
            video.videos = value.videos;
            video.firstTime = value.firstTime;
            video.skip = value.skip;
            video.total = value.total;
            localStorageService.set(categoryID, video);

        }

        this.getVideoBySession = function (categoryID) {
            return localStorageService.get(categoryID);

        }

        this.addVideoToFavourist = function (value) {
            var video = {};
            video.videos = value.videos;
            localStorageService.cookie.set('favorist',video);
           // localStorageService.set("favorist", video);
        }

        this.getAllVideoFromFavourist = function () {
            return localStorageService.cookie.get("favorist");
           // return localStorageService.get("favorist");
        }

        this.removeVideoFromFavourist = function(video) {
            var value = localStorageService.cookie.get("favorist");
            var newVideos = value.videos.remove(function (el) {
                    return el.id === video.id;
                });
            value.videos = newVideos;
            localStorageService.cookie.set('favorist',value);
            return localStorageService.cookie.get("favorist");
        }



    }
)