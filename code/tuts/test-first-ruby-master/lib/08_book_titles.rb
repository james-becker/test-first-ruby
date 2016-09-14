class Book
  def title
    @title
  end

  def title=(title)
    @title = caps(title)
  end

  def caps (title)
    arr = title.split(' ')
    unwords = %w{ of on by the a an to and in }
    arr.each do |word|
      word.capitalize! unless unwords.include?(word)
    end
    arr[0] = arr[0].capitalize
    arr = arr.join(' ')
    arr
  end
end