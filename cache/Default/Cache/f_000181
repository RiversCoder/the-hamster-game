/**
 * @package SP Page Builder
 * @author JoomShaper http://www.joomshaper.com
 * @copyright Copyright (c) 2010 - 2016 JoomShaper
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
 */

 (function ($) {

   /* ========================================================================
   * Initiate Media Modal
   * ======================================================================== */

   $(document).on('click', '.sp-pagebuilder-btn-media-manager', function(event) {
     event.preventDefault()
     $this = $(this);

     $.ajax({
       type : 'POST',
       url: 'index.php?option=com_sppagebuilder&view=media&layout=modal&format=json',
       data: {support: $this.attr('data-support'), type: $this.attr('data-support'), target: $this.prev().attr('id')},
       beforeSend: function() {
         $this.find('.fa').show();
       },
       success: function (modal) {
         $this.find('.fa').hide();
         $(modal).show().appendTo($('body').addClass('sp-pagebuilder-media-modal-open'));
         $('.sp-pagebuilder-media-toolbar select').chosen();
       }
     })
   })

   // Close Modal
   $(document).on('click', '.sp-pagebuilder-btn-close-modal', function(event) {
     event.preventDefault();
     $('.sp-pagebuilder-media-modal-overlay').remove();
     $('body').removeClass('sp-pagebuilder-media-modal-open');
   });

  /* ========================================================================
  * Browse Media
  * ======================================================================== */

  $.fn.browseMedia = function(options) {
    var options = $.extend({
      type: '*',
      search : '',
      date : '',
      start : 0,
      filter : true,
      categories: false,
      support: 'image'
    }, options)

    $.ajax({
      type : 'POST',
      url: 'index.php?option=com_sppagebuilder&view=media&layout=browse&format=json',
      data: {type: options.type, date: options.date, start: options.start, search: options.search, categories: options.categories, support: options.support},
      beforeSend: function() {
        $('#sp-pagebuilder-media-loadmore').hide()
        $('.sp-pagebuilder-media').remove()
        $('#sp-pagebuilder-cancel-media').parent().hide()
        $('.sp-pagebuilder-media-wrapper').addClass('sp-pagebuilder-media-pre-loading').prepend($('<div class="sp-pagebuilder-loading"><i class="pbfont pbfont-pagebuilder"></i></div>'))
      },
      success: function (response) {

        $('.sp-pagebuilder-media-wrapper').removeClass('sp-pagebuilder-media-pre-loading')
        $('.sp-pagebuilder-loading').remove();

          var data = $.parseJSON(response)

          $('#sp-pagebuilder-media-types').find('.active').find('.fa').removeClass('fa-spin fa-spinner');

          if(options.filter) {
            $('#sp-pagebuilder-media-filter').html(data.date_filter).trigger("liszt:updated").removeAttr().attr('data-type', 'browse');
          }

          if(options.categories) {
            $('#sp-pagebuilder-media-types').html(data.media_categories);

            if(options.support) {
              $('#sp-pagebuilder-media-types').find('>li').removeClass('active');
              $('#sp-pagebuilder-media-types').find('.sp-pagebuilder-media-type-' + options.support).addClass('active');
            }
          }

          if(data.count) {
            $('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').removeClass('sp-pagebuilder-media-manager-empty');
          } else {
            $('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').addClass('sp-pagebuilder-media-manager-empty');
          }

          $('.sp-pagebuilder-media-wrapper').prepend(data.output)

          if(data.loadmore) {
            $('#sp-pagebuilder-media-loadmore').removeAttr('style')
          } else {
            $('#sp-pagebuilder-media-loadmore').hide();
          }

      }
    })
  }


  /* ========================================================================
  * Browse Folders
  * ======================================================================== */

  $.fn.browseFolders = function(options) {

    var options = $.extend({
      path: '/images',
      filter: true
    }, options);

    return this.each(function() {
      $.ajax({
        url: 'index.php?option=com_sppagebuilder&view=media&layout=folders&format=json',
        type   : 'POST',
        data: {path: options.path},

        beforeSend: function() {

          if(options.filter) {
            $('#sp-pagebuilder-media-filter').removeAttr().attr('data-type', 'folders').val(options.path).parent().show()
          }

          $('#sp-pagebuilder-cancel-media, #sp-pagebuilder-delete-media').parent().hide()

          $('#sp-pagebuilder-media-loadmore').hide()
          $('.sp-pagebuilder-media').remove()
          $('.sp-pagebuilder-media-wrapper').addClass('sp-pagebuilder-media-pre-loading').prepend($('<div class="sp-pagebuilder-loading"><i class="pbfont pbfont-pagebuilder"></i></div>'))
        },

        success: function (response) {
          $('.sp-pagebuilder-media-wrapper').removeClass('sp-pagebuilder-media-pre-loading')
          $('.sp-pagebuilder-loading').remove();

          var data = $.parseJSON(response)

          if(data.count) {
            $('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').removeClass('sp-pagebuilder-media-manager-empty');
          } else {
            $('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').addClass('sp-pagebuilder-media-manager-empty');
          }

          $('#sp-pagebuilder-media-types').find('.active').find('.fa').removeClass('fa-spin fa-spinner');

          if(options.filter) {
            $('#sp-pagebuilder-media-filter').html(data.folders_tree).trigger("liszt:updated").removeAttr().attr('data-type', 'folders');
          }

          $('.sp-pagebuilder-media-wrapper').prepend(data.output)
        }
      })
    })
  }

  $(document).on('click', '.sp-pagebuilder-media-to-folder-back', function(event){
    event.preventDefault()
    $('.sp-pagebuilder-media-btn-tools').hide()
    $(this).browseFolders({
      path: $(this).data('path')
    })
  })

  $(document).on('click', '.sp-pagebuilder-media-to-folder', function(event){
    event.preventDefault()
    $('.sp-pagebuilder-media').find('>li.sp-pagebuilder-media-item').removeClass('selected')
    $('.sp-pagebuilder-media').find('>li.sp-pagebuilder-media-folder').removeClass('folder-selected')
    $(this).closest('li.sp-pagebuilder-media-folder').addClass('folder-selected')
  })

  $(document).on('dblclick', '.sp-pagebuilder-media-to-folder', function(event){
    event.preventDefault()
    $('.sp-pagebuilder-media-btn-tools').hide()
    $(this).browseFolders({
      path: $(this).attr('data-path')
    })
  })

  /* ========================================================================
  * Upload Media
  * ======================================================================== */

  $.fn.uploadMedia = function(options) {

    var options = $.extend({
      index: '',
      data : ''
    }, options)

    $.ajax({
      type: "POST",
      url: 'index.php?option=com_sppagebuilder&task=media.upload_media',
      data: options.data,
      contentType: false,
      cache: false,
      processData:false,
      beforeSend: function() {

        var folders = $('.sp-pagebuilder-media').find('.sp-pagebuilder-media-folder:not(.sp-pagebuilder-media-to-folder-back)');
        var toback = $('.sp-pagebuilder-media').find('.sp-pagebuilder-media-to-folder-back');
        var placeholder = $('<li id="'+ options.index +'" class="sp-pagebuilder-media-file-loader"><div><div><div><div><div class="sp-pagebuilder-media-upload-progress"><div><div class="sp-pagebuilder-progress"><div class="sp-pagebuilder-progress-bar" style="width: 0%;"></div></div></div></div></div></div></div><span class="sp-pagebuilder-media-title"><i class="fa fa-circle-o-notch fa-spin"></i> ' + Joomla.JText._('COM_SPPAGEBUILDER_MEDIA_MANAGER_MEDIA_UPLOADING') + '...</span></div></li>');
        if(folders.length) {
          folders.last().after(placeholder)
        } else if(toback.length) {
          toback.first().after(placeholder)
        } else {
          $('.sp-pagebuilder-media').prepend(placeholder);
        }

        $('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').removeClass('sp-pagebuilder-media-manager-empty');
      },
      success: function(response) {

        var data = $.parseJSON(response)

        if(data.status) {
          $('.sp-pagebuilder-media').find('#' + options.index).removeAttr('id').removeClass('sp-pagebuilder-media-file-loader"').addClass('sp-pagebuilder-media-item').attr('data-id', data.id).attr('data-src', data.src).attr('data-path', data.path).empty().html(data.output);
        } else {
          $('.sp-pagebuilder-media').find('#' + options.index).remove();
          alert(data.output);
        }

        if($('.sp-pagebuilder-media').find('>li').length) {
          $('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').removeClass('sp-pagebuilder-media-manager-empty');
        } else {
          $('#sp-pagebuilder-media-manager, #sp-pagebuilder-media-modal').addClass('sp-pagebuilder-media-manager-empty');
        }

      },
      xhr: function() {
        myXhr = $.ajaxSettings.xhr();
        if(myXhr.upload){
          myXhr.upload.addEventListener('progress', function(evt) {
            $('.sp-pagebuilder-media').find('#' + options.index).find('.sp-pagebuilder-progress-bar').css('width', Math.floor(evt.loaded / evt.total *100) + '%').text(Math.floor(evt.loaded / evt.total *100) + '%');
          }, false);
        }
        return myXhr;
      }
    })
  }


  /* ========================================================================
  * Search Media
  * ======================================================================== */

  var searchPreviousValue,
  liveSearchTimer

  $(document).on('keyup', '#sp-pagebuilder-media-search-input', function(event) {
    event.preventDefault()

    if($(this).val() != '') {
      $('.sp-pagebuilder-clear-search').show()
    } else {
      $('.sp-pagebuilder-clear-search').hide()
    }

    if ($(this).val() != searchPreviousValue) {
      var query = $(this).val().trim();

      if (liveSearchTimer) {
        clearTimeout(liveSearchTimer);
      }

      liveSearchTimer = setTimeout(function () {
        if (query) {
          $(this).browseMedia({
            search: query,
            filter: true,
            date: $('#sp-pagebuilder-media-filter').val(),
            type: $('#sp-pagebuilder-media-types').find('.active > a').attr('data-type'),
            support: 'all'
          })
        }
        else {
          $(this).browseMedia({
            filter: true,
            date: $('#sp-pagebuilder-media-filter').val(),
            type: $('#sp-pagebuilder-media-types').find('.active > a').attr('data-type'),
            support: 'all'
          })
        }
      }, 300);

      searchPreviousValue = $(this).val()
    }
  })

  $(document).on('click', '.sp-pagebuilder-clear-search', function(event) {
    event.preventDefault()
    $('#sp-pagebuilder-media-search-input').val('').focus().keyup()
  })

  $(document).on('click', '#sp-pagebuilder-media-search-input', function(event) {
    event.preventDefault()
  })

  // Media Tab
  // =======================

  $(document).on('click', '.sp-pagebuilder-browse-media', function(event){
    event.preventDefault()
    var $this = $(this);

    $(this).closest('#sp-pagebuilder-media-types').children().removeClass('active');
    $(this).parent().addClass('active')
    $(this).find('.fa').addClass('fa-spinner fa-spin');

    $('#sp-pagebuilder-upload-media').parent().show();

    if($this.attr('data-type') == 'folders') {
      $('.sp-pagebuilder-media-search').parent().hide();
      $('#sp-pagebuilder-media-create-folder').parent().show();
      $(this).browseFolders();
    } else {
      $('.sp-pagebuilder-media-search').parent().show();
      $('#sp-pagebuilder-media-create-folder').parent().hide();

      var support = 'all';
      if($('#sp-pagebuilder-media-modal').length) {
        support = $('#sp-pagebuilder-media-modal').data('support');
      }

      $(this).browseMedia({
        type: $this.data('type'),
        support: support,
        element: $this
      })
    }
  })


  /* ========================================================================
  * Load More
  * ======================================================================== */

  $(document).on('click', '#sp-pagebuilder-media-loadmore', function(event){
    event.preventDefault()
    var $this = $(this)
    var query = $('#sp-pagebuilder-media-search-input').val().trim();

    var support = 'all';
    if($('#sp-pagebuilder-media-modal').length) {
      support = $('#sp-pagebuilder-media-modal').data('support');
    }

    $.ajax({
      type   : 'POST',
      url: 'index.php?option=com_sppagebuilder&view=media&layout=browse&format=json',
      data: {search: query, type: $('#sp-pagebuilder-media-types').find('.active > a').attr('data-type'), support: support, date: $('#sp-pagebuilder-media-filter').val(), start: $('.sp-pagebuilder-media').find('>li').length},
      beforeSend: function() {
        $this.find('.fa').removeClass('fa-refresh').addClass('fa-spinner fa-spin')
      },
      success: function (response) {
        try {
          var data = $.parseJSON(response)

          $this.find('.fa').removeClass('fa-spinner fa-spin').addClass('fa-refresh')

          $('.sp-pagebuilder-media').append(data.output)

          if(data.loadmore) {
            $('#sp-pagebuilder-media-loadmore').parent().removeAttr('style')
          } else {
            $('#sp-pagebuilder-media-loadmore').parent().hide();
          }

        } catch (e) {
          $('.sp-pagebuilder-media-body-inner').html(response)
        }
      }
    })
  })

  // Filter
  // =======================

  $(document).on('change', '#sp-pagebuilder-media-filter', function(event){
    event.preventDefault()

    if($(this).attr('data-type') == 'folders') {
    	$(this).browseFolders({
    		path: $(this).val()
    	})
    } else {
    	$(this).browseMedia({
    		filter: false,
    		date: $(this).val(),
    		type: $('#sp-pagebuilder-media-types').find('.active > a').attr('data-type'),
    		support: 'all'
    	})
    }
  })

  /* ========================================================================
  * Select Media
  * ======================================================================== */
  $(document).on('click', '.sp-pagebuilder-media > li.sp-pagebuilder-media-item', function(event) {
    event.preventDefault();
    var $this = $(this);

    $('.sp-pagebuilder-media').find('>li.sp-pagebuilder-media-folder').removeClass('folder-selected')
    if($this.hasClass('sp-pagebuilder-media-unsupported')) return;

    if($('#sp-pagebuilder-media-modal') != undefined) {
      $('#sp-pagebuilder-media-modal .sp-pagebuilder-media > li.sp-pagebuilder-media-item').not(this).each(function(){
        $(this).removeClass('selected')
      });
    }

    if($(this).hasClass('selected')) {
      $(this).removeClass('selected')
    } else {
      $(this).addClass('selected')
    }

    if($('.sp-pagebuilder-media > li.sp-pagebuilder-media-item.selected').length) {
      $('#sp-pagebuilder-upload-media, .sp-pagebuilder-media-search, #sp-pagebuilder-media-filter').parent().hide();
      $('#sp-pagebuilder-cancel-media, #sp-pagebuilder-delete-media').parent().show()
    } else {
      $('#sp-pagebuilder-cancel-media, #sp-pagebuilder-delete-media').parent().hide()
      $('#sp-pagebuilder-upload-media, .sp-pagebuilder-media-search, #sp-pagebuilder-media-filter').parent().show();
    }
  })

  /* ========================================================================
  * Insert Media
  * ======================================================================== */
  $(document).on('click', '#sp-pagebuilder-insert-media', function(event) {
    event.preventDefault()
    var support = $('#sp-pagebuilder-media-modal').attr('data-support');
    var $target = $('#' + $('#sp-pagebuilder-media-modal').attr('data-target'));

    if(support == 'image') {
      $target.prev('.sp-pagebuilder-media-preview').removeClass('sp-pagebuilder-media-no-image').attr('src', $('.sp-pagebuilder-media > li.sp-pagebuilder-media-item.selected').data('src'))
    }

    $target.val($('.sp-pagebuilder-media > li.sp-pagebuilder-media-item.selected').data('path'))

    $target.trigger('change');

    $('.sp-pagebuilder-media-modal-overlay').remove();
    $('body').removeClass('sp-pagebuilder-media-modal-open');
  })

  /* ========================================================================
  * Clear Media
  * ======================================================================== */
  $(document).on('click', '.sp-pagebuilder-btn-clear-media', function(event) {
    event.preventDefault();
    var $this = $(this);
    $this.siblings('.sp-pagebuilder-media-preview').addClass('sp-pagebuilder-media-no-image').removeAttr('src');
    $this.siblings('input').val('');
    $this.siblings('input').trigger('change');
  })

  /* ========================================================================
  * Cancel Media
  * ======================================================================== */
  $(document).on('click', '#sp-pagebuilder-cancel-media', function(event) {
    event.preventDefault()
    $('.sp-pagebuilder-media > li.sp-pagebuilder-media-item.selected').removeClass('selected')
    $('#sp-pagebuilder-cancel-media, #sp-pagebuilder-delete-media').parent().hide()
    $('#sp-pagebuilder-upload-media, .sp-pagebuilder-media-search, #sp-pagebuilder-media-filter').parent().show();

    if($('#sp-pagebuilder-media-filter').attr('data-type') == 'browse') {
      $('.sp-pagebuilder-media-search').parent().show();
    } else {
      $('.sp-pagebuilder-media-search').parent().hide();
    }
  })

  /* ========================================================================
  * Upload Media
  * ======================================================================== */

  $(document).on('click', '#sp-pagebuilder-upload-media, #sp-pagebuilder-upload-media-empty', function(event){
    event.preventDefault()
    $('#sp-pagebuilder-media-input-file').click()
  });

  $(document).on('change', '#sp-pagebuilder-media-input-file', function(event){
    event.preventDefault()
    var $this = $(this)
    var files = $(this).prop('files');
    var formdata = new FormData();

    for (i=0;i<files.length;i++){

      formdata.append('file', files[i]);

      if(($('#sp-pagebuilder-media-filter').attr('data-type') == 'folders') && ($('#sp-pagebuilder-media-filter').val() != undefined)) {
        formdata.append('folder', $('#sp-pagebuilder-media-filter').val())
      }

      $(this).uploadMedia({
        data: formdata,
        index: 'media-id-' + Math.floor(Math.random() * (1e6 - 1 + 1) + 1)
      })
    }

    $this.val('')
  })


  /* ========================================================================
  * Drag & Drop Upload
  * ======================================================================== */
  $(document).on('dragenter', '#sp-pagebuilder-media-manager', function (event){
    event.preventDefault();
    event.stopPropagation();
    $(this).addClass('sp-pagebuilder-media-drop')
  })

  $(document).on('mouseleave', '#sp-pagebuilder-media-manager', function (event){
    event.preventDefault();
    event.stopPropagation();
    $(this).removeClass('sp-pagebuilder-media-drop')
  })

  $(document).on('dragover', '#sp-pagebuilder-media-manager', function (event){
    event.preventDefault();
  })

  $(document).on('drop', '#sp-pagebuilder-media-manager', function (event){
    event.preventDefault();
    event.stopPropagation();
    $(this).removeClass('sp-pagebuilder-media-drop');
    var files = event.originalEvent.dataTransfer.files

    for (i=0;i<files.length;i++){
      var formdata = new FormData();

      formdata.append('file', files[i])

      if(($('#sp-pagebuilder-media-filter').attr('data-type') == 'folders') && ($('#sp-pagebuilder-media-filter').val() != undefined)) {
        formdata.append('folder', $('#sp-pagebuilder-media-filter').val())
      }

      $(this).uploadMedia({
        data: formdata,
        index: 'media-id-' + Math.floor(Math.random() * (1e6 - 1 + 1) + 1)
      })
    }
  })


  /* ========================================================================
  * Delete Media
  * ======================================================================== */
  $(document).on('click', '#sp-pagebuilder-delete-media', function(event) {
    event.preventDefault()
    var $this = $(this)
    var $target = $('.sp-pagebuilder-media').find('li.sp-pagebuilder-media-item.selected');

    if (confirm(Joomla.JText._('COM_SPPAGEBUILDER_MEDIA_MANAGER_CONFIRM_DELETE')) == true) {
      $target.each(function(index, el){
        $.ajax({
          type: "POST",
          url: 'index.php?option=com_sppagebuilder&task=media.delete_media',
          data: {id: $(el).data('id')},
          success: function(response) {
              var data = $.parseJSON(response)
              if(data.status) {
                $target.remove()
                $('#sp-pagebuilder-cancel-media, #sp-pagebuilder-delete-media').parent().hide()
                $('#sp-pagebuilder-upload-media, .sp-pagebuilder-media-search, #sp-pagebuilder-media-filter').parent().show();
              } else {
                alert(data.output)
              }
          }
        })
      });
    }
  })

  // Create folder
  $(document).on('click', '#sp-pagebuilder-media-create-folder', function(event) {
    event.preventDefault();
    var $this = $(this);
    var directory = '/images';

    if(($('#sp-pagebuilder-media-filter').val() != undefined) && ($('#sp-pagebuilder-media-filter').attr('data-type') == 'folders') ) {
      directory = $('#sp-pagebuilder-media-filter').val();
    }

    var folder_name = prompt(Joomla.JText._('COM_SPPAGEBUILDER_MEDIA_MANAGER_ENTER_DIRECTORY_NAME'));
    if (folder_name != null) {
      $.ajax({
        type: "POST",
        url: 'index.php?option=com_sppagebuilder&task=media.create_folder',
        data: {folder: directory + '/' + folder_name},
        success: function(response) {
          try {
            var data = $.parseJSON(response)
            if(data.status) {
              var folders = $('.sp-pagebuilder-media').find('.sp-pagebuilder-media-folder:not(.sp-pagebuilder-media-to-folder-back)');

              if(folders.length) {
                folders.first().before(data.output)
              } else {
                $('.sp-pagebuilder-media').append(data.output);
              }
            } else {
              alert(data.output)
            }
          } catch (e) {
            $('.sp-pagebuilder-media-body-inner').html(response)
          }
        }
      })
    }

  });

})(jQuery)
