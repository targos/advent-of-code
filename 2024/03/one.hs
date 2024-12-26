import qualified Text.Parsec as Parsec
import Text.Parsec ((<|>))
import Data.Either (fromRight)
import Data.Maybe (fromMaybe)

main = do
  input <- getContents
  print (solveExercise input)

solveExercise = sum . map (fromMaybe 0) . parseMul

parseMul :: String -> [Maybe Int]
parseMul input = fromRight [] $ Parsec.parse parser "(input)" input

parser = Parsec.many (Parsec.try pMul <|> skipToken)

pMul :: Parsec.Parsec String () (Maybe Int)
pMul = do
  Parsec.string "mul("
  first <- Parsec.many1 Parsec.digit
  Parsec.char ','
  second <- Parsec.many1 Parsec.digit
  Parsec.char ')'
  return $ Just (read first * read second)

skipToken = do
  Parsec.anyToken
  return Nothing
