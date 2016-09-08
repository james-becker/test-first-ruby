def add(n1, n2)
	n1 + n2
end

def subtract(n1, n2)
	n1 - n2
end

def sum(arr)
	sum = 0
	arr.each { |i| sum += i }
	return sum
end

def multiply(*args)
  product = 1
  for num in args
    product *= num
  end
  product
end

def power(base, exp)
  multiplier = base
  (exp-1).times do |x|
    base *= multiplier
  end
  base
end

def factorial(n)
  if n == 0
    product = 0
    return product
  else
    product = 1
    while n > 0 do
      product = product * n
      n -= 1
    end
  end
  product
end