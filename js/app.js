import '../css/app.scss'
import $ from "jquery"
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap-validator/dist/validator.min.js'
import '../node_modules/fotorama/fotorama.js'
import 'waypoints'
import 'scrollTo'
import request from 'request'

/**
 * EXAMPLE JS STARTS
 */
$(function() {
    function addClassTo(element, className) {
      element.addClass(className)
    }
    function removeClassFrom(element, className) {
      element.removeClass(className)
    }

    setInterval(function () {
      addClassTo($('.accent-button'), 'pulse')
    }, 5000)
    setInterval(function () {
      removeClassFrom($('.accent-button'), 'pulse')
    }, 6000)

    $('[id^=scrollTo]').click(function() {
        var id = $(this).attr('id').slice(9)
        $(window).scrollTo($('#' + id), 1000, { offset: { top: -51, left: 0 } })
    })

    $('#marketing').waypoint(function() {
        $('.img-circle').addClass('animated zoomIn')
    }, {
        offset: '50%',
        triggerOnce: true
    })

    $('.featurette').waypoint(function() {
        $('#' + this.element.id + ' .featurette-image').addClass('animated pulse')
    }, {
        offset: '50%',
        triggerOnce: true
    })
})

$(document).ready(function() {
  $('#contact_form')
    .validator()
    .on('submit', function(e) {
      if (e.isDefaultPrevented()) {
        // handle the invalid form...
        return false
      } else {
        e.preventDefault()
        request
          .post('http://smartcreations.co.nz/dlm/js/contact-form.php',
            { form:
              {
                emailTitle: 'Message from website',
                inputName: $('#inputName').val(),
                inputEmail: $('#inputEmail').val(),
                inputPhone: $('#inputPhone').val(),
                inputMessage: $('#inputMessage').val(),
              }
            },
            function(error,response,body) {
              if (body) {
                const _body = JSON.parse(body)
                const message = _body.messageEnglish
                $('.contact-message').text(message)
                if (!error && _body.success) {
                  $('.contact-message').addClass('success-message')
                  $('#send-button').attr('disabled', true)
                  clearForm()
                } else {
                  $('.contact-message').addClass('error-message')
                }
              }
            }
          )
      }
    })

    function clearForm() {
      $('#inputName').val('')
      $('#inputEmail').val('')
      $('#inputPhone').val('')
      $('#inputMessage').val('')
    }
})
