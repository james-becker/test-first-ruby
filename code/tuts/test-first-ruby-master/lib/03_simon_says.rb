def echo(str)
  str
end

def shout(str)
  str.upcase
end

def repeat(str, num=2)
  arr = []
  num.times do
    arr.push(str)
  end
  arr = arr.join(' ')
  arr
end

# OR

def start_of_word(word, num)
  sliced = word.slice(0,num)
  sliced
end

def first_word(sentence)
  sentence[/^\w+/]
end

def titleize(sentence)
  unwords = %w{ and a an the of for over in on }
  sentence = sentence.split(' ')
  sentence.map! do |word|
    if unwords.include?(word)
      word = word
    else
      word.capitalize!
    end
  end
  sentence[0].capitalize!
  sentence = sentence.join(' ')
  sentence
end

