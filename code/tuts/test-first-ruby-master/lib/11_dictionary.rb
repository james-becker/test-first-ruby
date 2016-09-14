class Dictionary

  attr_accessor :entries

  def initialize
    @entries = Hash.new('')
  end

  def add(thing)
    if thing.is_a? String
      @entries.merge!(thing => nil)
    else
      @entries.merge!(thing)
    end
  end

  def keywords
    @entries.keys.sort
  end

  def include?(val)
    @entries.include?(val)
  end

  def find(key)
    @entries.select { |k, v| k.include?(key) }
  end

  def printable
    array = Array.new
    @entries.sort.each do |key, val|
      array << "[#{key}] \"#{val}\""
    end
    array = array.join("\n")
  end

end