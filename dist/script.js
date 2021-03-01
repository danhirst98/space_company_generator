// IFTTT Slottt Machine by Jen Hamon
// jen@ifttt.com
// github.com/jhamon
var wordlist = [
  'office',
  'official',
  'teamwork',
  'monitor',
  'schedule',
  'prepare',
  'track',
  'record',
  'remember',
  'make a note',
  'archive',
  'timeshift',
]

var primary_wordlist = [
    'Earth',
    'Space',
    'Launch',
    'Orbit',
    'Aerospace',
    'Astro',
    'Geo',
    'EO',
    'Planet',
    'Sky',
    "Know",
    "Eye",
    "Now",
    "i",
    "X",
    "One"
]

primary_wordlist = new Array(primary_wordlist.length * 3).fill(primary_wordlist).flat();

var secondary_wordlist = [
    "Know",
    "Eye",
    "Now",
    "i",
    "X",
    "One"
]

function buildSlotItem (text) {
    return $('<div>').addClass('slottt-machine-recipe__item')
                     .text(text)
}

function buildSlotContents ($container, wordlist) {
  $items = wordlist.map(buildSlotItem);
  $container.append($items);
}

function popPushNItems ($container, n) {
    $children = $container.find('.slottt-machine-recipe__item');
    $children.slice(0, n).insertAfter($children.last());

    if (n === $children.length) {
      popPushNItems($container, 1);
    }
}

// After the slide animation is complete, we want to pop some items off
// the front of the container and push them onto the end. This is
// so the animation can slide upward infinitely without adding
// inifinte div elements inside the container.
function rotateContents ($container, n) {
    setTimeout(function () {
      popPushNItems($container, n);
      $container.css({top: 0});
    }, 300);    
}

function randomSlotttIndex(max) {
  var randIndex = (Math.random() * max | 0);
  return (randIndex > 10) ? randIndex : randomSlotttIndex(max);
}

  
  
function animate1() {
  var wordIndex = randomSlotttIndex(primary_wordlist.length);
  $wordbox1.animate({top: -wordIndex*150}, 500, 'swing', function () {
    rotateContents($wordbox1, wordIndex);
  });
}

function animate2() {
  var wordIndex = randomSlotttIndex(primary_wordlist.length);
  $wordbox2.animate({top: -wordIndex*150}, 500, 'swing', function () {
    rotateContents($wordbox2, wordIndex);
  });
}


$(function () {
  $wordbox1 = $('#wordbox1 .slottt-machine-recipe__items_container');
  $wordbox2 = $('#wordbox2 .slottt-machine-recipe__items_container');
  buildSlotContents($wordbox1, primary_wordlist);
  buildSlotContents($wordbox2, primary_wordlist);

  ///buildSlotContents($wordbox, wordlist);
  //buildSlotContents($wordbox, wordlist);
  //buildSlotContents($wordbox, wordlist);
    $("#generate").click(function () {
    animate1();
    animate2();
})
});

