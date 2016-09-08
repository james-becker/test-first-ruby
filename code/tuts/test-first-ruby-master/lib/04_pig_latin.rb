def translate(str)
  str = str.split(/\b/) # split ONLY at word boundaries. This is to ensure that later punctuation is retained.
  str = str.map { |word| modify(word) }
  str = str.join
end

def modify(word) # Helper function used with map
  unless word[0] =~ /[[:alpha:]]/ # POSIX expression
    # Alternatively, we could use /[A-Za-z]/
    return word
  end
  if isVowel?(word[0]) # Test if the word begins with a vowel
    word += "ay"
    return word
  else
    upcase = false # By default, the word is considered lowercase...
    if /[A-Z]/.match(word[0])
      upcase = true # But we set upcase to true if the word is uppercase.
    end
    word = word.downcase # Now that we have whether the word was originally upper or lowercase saved to memory, we downcase it all.
    chop = word[/\b[^aeiouqAEIOUQ]*(qu)*/] # This regex tests for words starting with strings of consonants and optionally ending with 'qu'.
    word = word[chop.length..-1] += chop += "ay" # We rebuild the word using Pig Latin rules...
    if upcase == true
      word = word.capitalize # And recapitalize the word if it was initially capitalized.
    end
    return word
  end
end

# Helper function to test if character is vowel. Using a regex would have been easier.

def isVowel?(l)
  v = %w{a e i o u}
  if v.include?(l)
    return true
  else
    return false
  end
end