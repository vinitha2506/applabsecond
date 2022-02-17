$('#bold').on('click', function() {
   document.execCommand('bold', false, null);
});

$('#italic').on('click', function() {
   document.execCommand('italic', false, null);
});

$('#underline').on('click', function() {
   document.execCommand('underline', false, null);
});

$('#align-left').on('click', function() {
   document.execCommand('justifyLeft', false, null);
});

$('#align-center').on('click', function() {
   document.execCommand('justifyCenter', false, null);
});

$('#align-right').on('click', function() {
   document.execCommand('justifyRight', false, null);
});

$('#list-ul').on('click', function() {
   document.execCommand('insertUnorderedList', false, null);
});

$('#list-ol').on('click', function() {
   document.execCommand('insertOrderedList', false, null);
});

$('#fonts').on('change', function() {
   var font = $(this).val();
   document.execCommand('fontName', false, font);
});

$('#size').on('change', function() {
   var size = $(this).val();
   $('.editor').css('fontSize', size + 'px');
});

$('#color').spectrum({
   color: '#000',
   showPalette: true,
   showInput: true,
   showInitial: true,
   showInput: true,
   preferredFormat: "hex",
   showButtons: false,
   change: function(color) {
      color = color.toHexString();
      document.execCommand('foreColor', false, color);
   }
});

$('.editor').perfectScrollbar();


















function readURL(input) {
		if (input.files && input.files[0]) {

			var reader = new FileReader();

			reader.onload = function (e) {
				$('.file-upload-image').attr('src', e.target.result);
				$('.image-upload-wrap').show();
				$('.image-title').html(input.files[0].name);
			};      

			reader.readAsDataURL(input.files[0]);

		}  else {
			$('.image-upload-wrap').hide();
		}
	}
	function removeUpload(){
		$('.file-upload-input').replaceWith($('.file-upload-input').clone());
		$('.image-upload-wrap').hide();
	}

const db = localStorage;

/**
 * short query selector
 *
 * @param      {<type>}  el      { parameter_description }
 * @return     {string}  { description_of_the_return_value }
 */
const _ = (el) => {
	return document.querySelector(el);
};
/**
 * Gets the tpl.
 *
 * @param      {<type>}  element  The element
 * @return     {string}  The tpl.
 */
const getTpl = (element) => {
	return tpl[element];
};

/**
 * Makes an editable.
 *
 * @return     {string}  { description_of_the_return_value }
 */
const makeEditable = () => {
	let elements = document.querySelectorAll('.drop-element');
	let toArr = Array.prototype.slice.call(elements);
	Array.prototype.forEach.call(toArr, (obj, index) => {
		if (obj.querySelector('img')) {
			return false;
		} else {
			obj.addEventListener('click', (e) => {
				e.preventDefault();
				obj.children[0].setAttribute('contenteditable', '');
				obj.focus();
			});
			obj.children[0].addEventListener('blur', (e) => {
				e.preventDefault();
				obj.children[0].removeAttribute('contenteditable');
			});
		}
	});
};
/**
 * Removes a divs to save.
 *
 * @return     {string}  { description_of_the_return_value }
 */
const removeDivsToSave = () => {
	let elements = document.querySelectorAll('.drop-element');
	let toArr = Array.prototype.slice.call(elements);
	let html = '';
	Array.prototype.forEach.call(toArr, (obj, index) => {
    obj.children[0].removeAttribute('contenteditable');
		html += obj.innerHTML;
	});
	return html;
};

/**
 * Templates
 *
 * @type  string
 */
const tpl = {
  'Form': '<form method="post" enctype="text/plain" id="form"></form>',
  'Text Field': '<input type="text" id="Name" class="form-control">', 		
//   'Heading':'<h1>Form Heading</h1>',
  'short text':'<p class="short-text">Description of the from</p>',
  'Options' : '<div class="options"><select id="Options" class="form-control"><option>select any one</option><option>a</option><option>b</option</select></div>',
  'Datepicker':' <input type="date" id="Datepicker" name="Date picker" class="form-control">',
  'Image upload':'<input type="file" id="img"  accept="image/*" class="form-control">',
  'Radio':'<input type="radio" id="Radio" class="form-control" >',

  };

/**
 * init dragula
 *
 * @type  function
 */
const containers = [_('.box-left'), _('.box-right')];
const drake = dragula(containers, {
	copy(el, source) {
		return source === _('.box-left');
	},
	accepts(el, target) {
		return target !== _('.box-left');
	}
});

drake.on('out', (el, container) => {
	if (container == _('.box-right')) {
		el.innerHTML = getTpl(el.getAttribute('data-tpl'));
		el.className = 'drop-element';
		makeEditable();
		db.setItem('savedData', _('.box-right').innerHTML);
	}
	if (container == _('.box-left')) {
		el.innerHTML = el.getAttribute('data-title');
	}
});

/**
 * save in local storage
 */
if (typeof db.getItem('savedData') !== 'undefined') {
	_('.box-right').innerHTML = db.getItem('savedData');
  makeEditable();
};

/**
 * reset
 */
_('.reset').addEventListener('click', (e) => {
	e.preventDefault
	if (confirm('Are you sure ?')) {
		_('.box-right').innerHTML = '';
	}
});

/**
 * save to file
 */
_('.save').addEventListener('click', (e) => {
	e.preventDefault();
	var blob = new Blob([removeDivsToSave()], {
		type: 'text/html;charset=utf-8'
	});
  db.setItem('savedData', _('.box-right').innerHTML);
	saveAs(blob, 'file.html');
});
$(document).bind('dragover', function (e) {
    var dropZone = $('.zone'),
        timeout = window.dropZoneTimeout;
    if (!timeout) {
        dropZone.addClass('in');
    } else {
        clearTimeout(timeout);
    }
    var found = false,
        node = e.target;
    do {
        if (node === dropZone[0]) {
            found = true;
            break;
        }
        node = node.parentNode;
    } while (node != null);
    if (found) {
        dropZone.addClass('hover');
    } else {
        dropZone.removeClass('hover');
    }
    window.dropZoneTimeout = setTimeout(function () {
        window.dropZoneTimeout = null;
        dropZone.removeClass('in hover');
    }, 100);
});