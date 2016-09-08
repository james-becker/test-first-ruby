def ftoc(num)
	(num - 32.0) * 5.0/9
end

def ctof(num)
	(num * 9.0/5) + 32.0
end

# Notes: To make Ruby math work normally, throw in a decimal to make the compiler recognize the numbers as floating points.