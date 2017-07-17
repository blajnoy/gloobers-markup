(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals.
        factory(jQuery);
    }
})(function ($) {

    'use strict';

    var console = window.console || {
            log: function () {
            }
        };

    var isAdvancedUpload = function () {
        var div = document.createElement('div');
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    }();

    var droppedFiles = false;


    function CropAvatar($element) {
        this.$container = $element;

        this.$avatarView = this.$container.find('.picture-view');
        this.$avatar = this.$avatarView.find('img');
        this.$avatarModal = this.$container.find('#crop-picture-modal');
        this.$loading = this.$container.find('.loading');

        this.$avatarForm = this.$avatarModal.find('.picture-form');
        this.$avatarUpload = this.$avatarForm.find('.picture-upload');
        this.$avatarSrc = this.$avatarForm.find('.picture-src');
        this.$avatarData = this.$avatarForm.find('.picture-data');
        this.$avatarInput = this.$avatarForm.find('.picture-input');
        this.$avatarSave = this.$avatarForm.find('.picture-save');
        this.$avatarBtns = this.$avatarForm.find('.picture-btns');

        this.$avatarWrapper = this.$avatarModal.find('.picture-wrapper');
        this.$avatarPreview = this.$avatarModal.find('.picture-preview');

        this.$avatarBody = this.$avatarModal.find('.picture-body');

        this.$btnExtraOpenModal = this.$container.find('.btn-open-crop-picture');

        this.$fileUploadExtra = this.$container.find('.file-upload-extra');


        this.$cropperSize = new Slider('#cropImgSize2', {
            tooltip: 'hide'
        });

        this.init();
    }

    CropAvatar.prototype = {
        constructor: CropAvatar,

        support: {
            fileList: !!$('<input type="file">').prop('files'),
            blobURLs: !!window.URL && URL.createObjectURL,
            formData: !!window.FormData
        },

        init: function () {
            this.support.datauri = this.support.fileList && this.support.blobURLs;

            if (!this.support.formData) {
                this.initIframe();
            }

            this.initTooltip();
            this.initModal();
            this.addListener();
        },

        dragDrop: function (e) {

            if (isAdvancedUpload) {
                var $form = this.$avatarForm;

                $form.addClass('has-advanced-upload');

                e.preventDefault();
                e.stopPropagation();

                if (e.type === 'dragover' || 'dragenter') {
                    $form.addClass('is-dragover');
                }

                if (e.type === 'dragleave' || 'dragend' || 'drop') {
                    $form.removeClass('is-dragover');
                }

                if (e.type === 'drop') {
                    droppedFiles = e.originalEvent.dataTransfer.files;
                    $.proxy(this.change, this)();
                }
            }

        },

        addListener: function () {
            //this.$avatarView.on('click', $.proxy(this.click, this));

            var _this = this;

            this.$btnExtraOpenModal.on('click', $.proxy(this.click, this));

            this.$avatarInput.on('change', $.proxy(this.change, this));

            this.$fileUploadExtra.on('click', function (e) {
                _this.$avatarUpload.find('label').trigger('click');
                return false;
            });


            this.$avatarForm.on('submit', $.proxy(this.submit, this));
            this.$avatarBtns.on('click', $.proxy(this.rotate, this));
            this.$avatarForm.on('drag dragstart dragend dragover dragenter dragleave drop', $.proxy(this.dragDrop, this));

            this.$cropperSize.on('slide', $.proxy(this.resize, this));

        },

        initTooltip: function () {
            this.$avatarView.tooltip({
                placement: 'bottom'
            });
        },

        initModal: function () {
            this.$avatarModal.modal({
                show: false
            });
        },

        initPreview: function () {

            var url = this.$avatar.attr('src');

            //this.$avatarPreview.html('<img src="' + url + '">');
        },

        initIframe: function () {
            var target = 'upload-iframe-' + (new Date()).getTime();
            var $iframe = $('<iframe>').attr({
                name: target,
                src: ''
            });
            var _this = this;

            // Ready ifrmae
            $iframe.one('load', function () {

                // respond response
                $iframe.on('load', function () {
                    var data;

                    try {
                        data = $(this).contents().find('body').text();
                    } catch (e) {
                        console.log(e.message);
                    }

                    if (data) {
                        try {
                            data = $.parseJSON(data);
                        } catch (e) {
                            console.log(e.message);
                        }

                        _this.submitDone(data);
                    } else {
                        _this.submitFail('Image upload failed!');
                    }

                    _this.submitEnd();

                });
            });

            this.$iframe = $iframe;
            this.$avatarForm.attr('target', target).after($iframe.hide());
        },

        click: function () {
            this.$avatarModal.modal('show');
            this.initPreview();
        },

        change: function () {
            //debugger;
            var files;
            var file;

            if (this.support.datauri) {
                files = droppedFiles || this.$avatarInput.prop('files');

                if (files.length > 0) {
                    file = files[0];

                    if (this.isImageFile(file)) {

                        if (this.url) {
                            URL.revokeObjectURL(this.url); // Revoke the old one
                        }

                        this.url = URL.createObjectURL(file);

                        this.startCropper();
                    }
                }
            } else {
                file = this.$avatarInput.val() || droppedFiles;

                if (this.isImageFile(file)) {
                    this.syncUpload();
                }
            }

            console.log()
        },

        submit: function () {
            if (!this.$avatarSrc.val() && !this.$avatarInput.val() && !droppedFiles) {
                return false;
            }

            if (this.support.formData) {
                this.ajaxUpload();
                return false;
            }
        },

        rotate: function (e) {
            var data;

            if (this.active) {
                data = $(e.target).data();

                if (data.method) {
                    this.$img.cropper(data.method, data.option);
                }
            }
        },

        resize: function (e) {
            if (this.active) {
                var z = e / 100;
                this.$img.cropper('zoomTo', z);
            }
        },

        isImageFile: function (file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        },

        startCropper: function () {
            var _this = this;

            if (this.active) {
                this.$img.cropper('replace', this.url);
            } else {
                this.$img = $('<img src="' + this.url + '">');
                this.$avatarWrapper.empty().html(this.$img);
                this.$img.cropper({
                    //background: false,
                    aspectRatio: 766/226,
                    preview: false,
                    crop: function (e) {
                        var json = [
                            '{"x":' + e.x,
                            '"y":' + e.y,
                            '"height":' + e.height,
                            '"width":' + e.width,
                            '"rotate":' + e.rotate + '}'
                        ].join();

                        _this.$avatarData.val(json);
                    }
                });

                this.active = true;

                this.$avatarBody.addClass('has-image');

            }

            this.$avatarModal.one('hidden.bs.modal', function () {
                //_this.$avatarPreview.empty();

                _this.$avatarInput.val('');

                _this.stopCropper();

                _this.$avatarBody.removeClass('has-image');

                droppedFiles = false;
            });
        },

        stopCropper: function () {
            if (this.active) {
                this.$img.cropper('destroy');
                this.$img.remove();
                this.active = false;
            }
        },

        ajaxUpload: function () {
            var url = this.$avatarForm.attr('action');
            var data = new FormData(this.$avatarForm[0]);
            var _this = this;

            $.ajax(url, {
                type: 'post',
                data: data,
                dataType: 'json',
                processData: false,
                contentType: false,

                beforeSend: function () {
                    _this.submitStart();
                },

                success: function (data) {
                    _this.submitDone(data);
                },

                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    _this.submitFail(textStatus || errorThrown);
                },

                complete: function () {
                    _this.submitEnd();
                }
            });
        },

        syncUpload: function () {
            this.$avatarSave.click();
        },

        submitStart: function () {
            this.$loading.fadeIn();
        },

        submitDone: function (data) {

            if ($.isPlainObject(data) && data.state === 200) {
                if (data.result) {
                    this.url = data.result;

                    if (this.support.datauri || this.uploaded) {
                        this.uploaded = false;
                        this.cropDone();
                    } else {
                        this.uploaded = true;
                        this.$avatarSrc.val(this.url);
                        this.startCropper();
                    }

                    this.$avatarInput.val('');
                    droppedFiles = false;
                } else if (data.message) {
                    this.alert(data.message);
                }
            } else {
                this.alert('Failed to response');
            }
        },

        submitFail: function (msg) {
            this.alert(msg);
        },

        submitEnd: function () {
            this.$loading.fadeOut();
        },

        cropDone: function () {
            this.$avatarForm.get(0).reset();
            this.$avatar.attr('src', this.url);
            this.stopCropper();
            this.$avatarModal.modal('hide');
        },

        alert: function (msg) {
            var $alert = [
                '<div class="alert alert-danger avatar-alert alert-dismissable">',
                '<button type="button" class="close" data-dismiss="alert">&times;</button>',
                msg,
                '</div>'
            ].join('');

            this.$avatarUpload.after($alert);
        }
    };

    $(function () {
        return new CropAvatar($('#crop-picture'));
    });

});