// DotNetNuke® - http://www.dnnsoftware.com
//
// Copyright (c) 2002-2015, DNN Corp.
// All rights reserved.

﻿function FileExtension(extension, fileType, canIndex) {
    var self = this;
    self.extension = ko.observable(extension);
    self.fileType = ko.observable(fileType);
    self.canIndex = ko.observable(canIndex);
    self.newExtension = ko.observable(true);
    self.isSelected = ko.observable(false);
    self.errorHtml = ko.observable("");
    self.showError = ko.observable(false)
}