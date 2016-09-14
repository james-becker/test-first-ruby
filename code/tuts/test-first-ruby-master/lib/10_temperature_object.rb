class Temperature

  def initialize(options = {})
    @celsius = options[:c] || ftoc(options[:f])
    @fahrenheit = options[:f] || ctof(options[:c])
  end

  celsius = @celsius
  fahrenheit = @fahrenheit

  def in_celsius
    return @celsius
  end

  def in_fahrenheit
    return @fahrenheit
  end

  def self.from_celsius(num)
    Temperature.new({ :c => num})
  end

  def self.from_fahrenheit(num)
    Temperature.new({ :f => num })
  end

  def ftoc(num)
    ((num - 32) / 1.8).round(2)
  end

  def ctof(num)
    ((num * 1.8) + 32).round(2)
  end

end

class Celsius < Temperature
  def initialize(num)
    @celsius = num
    @fahrenheit = (  (@celsius * 1.8) + 32  ).round(2)
  end
end

class Fahrenheit < Temperature
  def initialize(num)
    @fahrenheit = num
    @celsius = (  (@fahrenheit - 32) / 1.8  ).round(2)
  end
end