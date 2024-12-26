import qualified Text.Parsec as Parsec
import Text.Parsec ((<|>))
import Data.Either (fromRight)

main = do
  input <- getContents
  print (solveExercise input)

data Instruction = Do | Dont | Mul Int | Skip deriving (Show)

solveExercise :: String -> Int
solveExercise = snd . foldl accumulate (True, 0) . parseMul

accumulate :: (Bool, Int) -> Instruction -> (Bool, Int)
accumulate (_, acc) Do = (True, acc)
accumulate (_, acc) Dont = (False, acc)
accumulate (doDont, acc) Skip = (doDont, acc)
accumulate (False, acc) (Mul _) = (False, acc)
accumulate (True, acc) (Mul other) = (True, acc + other)

parseMul :: String -> [Instruction]
parseMul input = fromRight [] $ Parsec.parse parser "(input)" input

parser = Parsec.many (Parsec.try pMul <|> Parsec.try pDo <|> Parsec.try pDont <|> skipToken)

pMul :: Parsec.Parsec String () Instruction
pMul = do
  Parsec.string "mul("
  first <- Parsec.many1 Parsec.digit
  Parsec.char ','
  second <- Parsec.many1 Parsec.digit
  Parsec.char ')'
  return $ Mul (read first * read second)

pDo = do
  Parsec.string "do()"
  return Do

pDont = do
  Parsec.string "don't()"
  return Dont

skipToken = do
  Parsec.anyToken
  return Skip
