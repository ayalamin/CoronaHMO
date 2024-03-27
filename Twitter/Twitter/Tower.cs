using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Twitter;
abstract class Tower
{
public int Length { get; set; }
public int Height { get; set; }

public abstract void Print(string st, int outcome);

}