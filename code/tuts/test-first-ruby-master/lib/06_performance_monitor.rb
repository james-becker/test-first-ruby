def measure(arg=1)
  start = Time.now
  arg.times { yield }
  finish = Time.now
  elapsed_time = (finish - start)/arg
end
