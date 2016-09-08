def reverser
  string = yield
  string = string.split(' ')
  string.each do |x|
    x = x.reverse
  end
  string = string.join(' ')
  string
end

def adder(*arg)
  if arg.length == 0
    return yield + 1
  else
    return yield + arg[0]
  end
end

def repeater(*arg)
  if arg.length == 0
    return yield
  else
    arg[0].times do
      return yield
    end
  end
end