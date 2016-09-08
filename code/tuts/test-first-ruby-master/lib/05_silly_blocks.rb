def reverser
  string = yield.split(' ')
  string.map { |x| x.reverse! }
  string = string.join(' ')
end

def adder(arg=1)
  yield + arg
end

def repeater(arg=1)
  arg.times do
    yield
  end
end