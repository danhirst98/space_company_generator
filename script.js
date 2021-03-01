// IFTTT Slottt Machine by Jen Hamon
// jen@ifttt.com
// github.com/jhamon


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
]


var secondary_wordlist = [
    "Know",
    "Eye",
    "Now",
    "i",
    "X",
    "One"
]

function combine_words (primary, secondary) {
    var all_words = []
    for (var primary_word of primary) {
        for (var secondary_word of secondary) {
            all_words.push(primary_word + secondary_word)
            all_words.push(secondary_word +primary_word)
        }
    }
    return all_words
}


var all_words = combine_words(primary_wordlist, secondary_wordlist)

//primary_wordlist = new Array(primary_wordlist.length * 3).fill(primary_wordlist).flat();


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

  
  
function animate() {
  var wordIndex = randomSlotttIndex(all_words.length);
  $wordbox.animate({top: -wordIndex*150}, 500, 'swing', function () {
    rotateContents($wordbox, wordIndex);
  });
}




$(function () {
  $wordbox = $('#wordbox .slottt-machine-recipe__items_container');
  buildSlotContents($wordbox, all_words);
  ///buildSlotContents($wordbox, wordlist);
  //buildSlotContents($wordbox, wordlist);
  //buildSlotContents($wordbox, wordlist);
    $("#generate").click(function () {
    animate();
})
});

