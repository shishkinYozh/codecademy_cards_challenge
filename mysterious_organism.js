// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}
/*
1.
Since you need to create multiple objects, create a factory function pAequorFactory() that has two parameters
*/
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
/*
2.
Your team wants you to simulate P. aequor‘s high rate of mutation (change in its DNA).
To simulate a mutation, in pAequorFactory()‘s returned object, add the method .mutate()
*/
    mutate() {
      const randBaseIndex = Math.floor(Math.random()*this.dna.length)
      let newRandBase = returnRandBase()
      while(this.dna[randBaseIndex] === newRandBase){
        newRandBase = returnRandBase()
      }
      this.dna[randBaseIndex] = newRandBase
    },
/*
3.
Your research team wants to be able to compare the DNA sequences of different P. aequor.
You’ll have to add a new method (.compareDNA()) to the returned object of the factory function.
.compareDNA() has one parameter, another pAequor object.
*/
    compareDNA(pAequor) {
      if(this.dna.length === pAequor.dna.length) {
        let matches = 0
        this.dna.forEach((base,index)=>{
          if(base === pAequor.dna[index]) {
            matches++
          }
        })
        console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${Math.floor(matches / pAequor.dna.length * 100)}% DNA in common`)
      } else {
        console.log('Can\'t compare, different sizes of dna')
      }
    },
/*
4.
P. aequor have a likelier chance of survival if their DNA is made up of at least 60% 'C' or 'G' bases.
In the returned object of pAequorFactory(), add another method .willLikelySurvive().
*/
    willLikelySurvive() {
      return this.dna.filter(base => {
        return base ==='C' || base ==='G'
        }).length/this.dna.length > 0.6
    },
/*
9.
Create a .complementStrand() method to the factory function’s object that returns the complementary DNA strand. 
The rules are that 'A's match with 'T's and vice versa. Also, 'C's match with 'G's and vice versa. (Check the hint for more details)
*/
    complementStrand() {
      const opposingBases = {
        'A':'T','T':'A','C':'G','G':'C'
      }
      this.dna.map(base => opposingBases[base])
    }
  }
}
/*
5.
With the factory function set up, your team requests that you create 30 instances of pAequor that can survive in their natural environment. 
Store these instances in an array for your team to study later.
*/
const pAequors = []
let num = 1
while(pAequors.length < 30) {
  const pAequor = pAequorFactory(num,mockUpStrand())
  if(pAequor.willLikelySurvive()) {
    pAequors.push(pAequor)
  }
  num++
}
console.log(pAequors)
