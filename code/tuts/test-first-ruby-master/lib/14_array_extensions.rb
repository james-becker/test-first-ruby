class Array
  def sum
    if self.length > 0
      self.reduce(:+)
    else
      0
    end
  end

  def square
    if self.length > 0
      self.map { |i| i*i }
    else
      self
    end
  end

  def square!
    if self.length > 0
      self.map! { |i| i*i }
    else
      self
    end
  end
end