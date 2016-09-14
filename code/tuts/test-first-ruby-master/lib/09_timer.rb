class Timer
  def seconds
    @seconds = 0
  end
  
  def seconds=(num)
    @seconds = num
  end
  
  def time_string
    # days = (@seconds/86400)
    # puts "days = #{days}"
    @hrs = @seconds/3600                         # Calc hours
    @mins = (@seconds - @hrs*3600)/60            # Calc mins
    @seconds = (@seconds - @hrs*3600 - @mins*60) # Calc seconds
    @time_string = "#{sprintf("%02d", @hrs)}:#{sprintf("%02d", @mins)}:#{sprintf("%02d", @seconds)}"
  end
end