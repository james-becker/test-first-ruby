class RPNCalculator
  attr_accessor :stack

  def initialize
    @stack = Array.new
  end

  def push(val)
    @stack << val.to_f
  end

  def plus
    if @stack.length < 2
      raise "calculator is empty"
    else
      @combo = @stack[-2..-1].reduce(:+)
      @stack = @stack[0, (@stack.length - 2)]
      @stack << @combo
    end
  end

  def minus
    if @stack.length < 2
      raise "calculator is empty"
    else
      @combo = @stack[-2..-1].reduce(:-)
      @stack = @stack[0, (@stack.length - 2)]
      @stack << @combo
    end
  end

  def divide
    if @stack.length < 2
      raise "calculator is empty"
    else
      @combo = @stack[-2..-1].reduce(:/)
      @stack = @stack[0, (@stack.length - 2)]
      @stack << @combo
    end
  end

  def times
    if @stack.length < 2
      raise "calculator is empty"
    else
      @combo = @stack[-2..-1].reduce(:*)
      @stack = @stack[0, (@stack.length - 2)]
      @stack << @combo
    end
  end

  def value
    @stack[-1]
  end

  def tokens(string)
    @tokens = string.split(' ')
    @tokens = @tokens.map do |val|
      if is_number?(val)
        val.to_i
      else
        "#{val}".to_sym
      end
    end
    @tokens
  end

  # Helper method
  def is_number?(string)
    true if Float(string) rescue false
  end

  def evaluate(string)
    initialize
    @eval = tokens(string)
    @eval.each do |val|
      if is_number?(val)
        push(val)
      elsif val == :+
        plus
      elsif val == :-
        minus
      elsif val == :/
        divide
      elsif val == :*
        times
      end
    end
    @stack[0]
  end

end