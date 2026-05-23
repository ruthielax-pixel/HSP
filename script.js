const questions = [
  'נראה שאני מודע לדקויות בסביבה שלי',
  'מצבי הרוח של אחרים משפיעים עליי',
  'אני נוטה להיות רגיש מאוד לכאבים',
  'בימים עמוסים אני מרגיש צורך לפרוש הצידה, למיטה או לחדר חשוך, או לכל מקום שבו אמצא מעט פרטיות והקלה על גירויים חיצוניים',
  'אני רגיש במיוחד לקפאין',
  'אני מוצף בקלות על-ידי אורות עזים, ריחות חזקים, בדים גסים או צפירות בקרבת מקום',
  'יש לי חיים פנימיים עשירים ומורכבים',
  'רעש חזק גורם לי לאי-נוחות',
  'אמנות או מוזיקה גורמות לי להתרגשות רבה',
  'אני אדם מצפוני',
  'אני נבהל בקלות',
  'אני נכנס ללחץ כשאני צריך לעשות הרבה בתוך זמן קצר',
  'כשאנשים חשים שלא בנוח בסביבה שבה הם נמצאים, אני יודע מה צריך לעשות כדי לעזור להם (לדוגמה, שינוי התאורה או מקום הישיבה שלהם)',
  'אני מרגיש מוטרד כשאנשים דוחקים בי לעשות יותר מדי דברים בבת אחת',
  'אני מנסה בכל כוחי שלא לשכוח דברים ולהימנע משגיאות',
  'אני מקפיד להימנע מתוכניות טלוויזיה ומסרטים אלימים',
  'אני חש עוררות-יתר לא נעימה כשדברים רבים קורים סביבי',
  'תחושת רעב עזה גורמת לי לתגובה חזקה ופוגעת בריכוז או במצב הרוח שלי',
  'שינויים בחיי מזעזעים אותי',
  'אני מבחין בריחות, טעמים, קולות ועבודות אמנות עדינים או מעודנים ונהנה מהם',
  'הצורך לארגן את חיי, כך שאוכל להימנע ממצבים שיגרמו לי לדאגה או הצפה, הוא בעדיפות גבוהה בשבילי',
  'כשאני מוכרח להשתתף בתחרות או לבצע משימה לעיני אחרים, אני רועד או נעשה עצבני כל כך, שרמת הביצועים שלי נמוכה',
  'בילדותי אמרו ההורים או המורים שלי שאני רגיש או ביישן'
];

const answersContainer = document.getElementById('answers');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submitButton');

function buildQuestionnaire() {
  questions.forEach((text, index) => {
    const row = document.createElement('div');
    row.className = 'answer-row';

    const noOption = createOption(index, false);
    const yesOption = createOption(index, true);

    const questionLabel = document.createElement('div');
    questionLabel.textContent = `${index + 1}. ${text}`;
    questionLabel.className = 'question-text';
    questionLabel.style.gridColumn = '1 / -1';

    row.appendChild(questionLabel);
    row.appendChild(noOption);
    row.appendChild(yesOption);
    answersContainer.appendChild(row);
  });
}

function createOption(questionIndex, value) {
  const id = `q${questionIndex}-${value ? 'yes' : 'no'}`;
  const wrapper = document.createElement('label');
  wrapper.setAttribute('for', id);

  const input = document.createElement('input');
  input.type = 'radio';
  input.id = id;
  input.name = `question-${questionIndex}`;
  input.value = value ? 'yes' : 'no';

  const span = document.createElement('span');
  span.textContent = value ? 'כן' : 'לא';

  wrapper.appendChild(input);
  wrapper.appendChild(span);
  return wrapper;
}

function calculateResult() {
  let positiveCount = 0;
  let unansweredCount = 0;

  questions.forEach((_, index) => {
    const answer = document.querySelector(`input[name="question-${index}"]:checked`);
    if (!answer) {
      unansweredCount += 1;
      return;
    }
    if (answer.value === 'yes') {
      positiveCount += 1;
    }
  });

  if (unansweredCount > 0) {
    resultContainer.style.display = 'block';
    resultContainer.style.background = '#fdf2f8';
    resultContainer.style.borderColor = '#fce7f3';
    resultContainer.style.color = '#9d174d';
    resultContainer.textContent = `אנא בחר תשובות לכל השאלות. נשארו ${unansweredCount} שאלות ללא מענה.`;
    return;
  }

  const isHighlySensitive = positiveCount > 12;
  const title = isHighlySensitive ? 'נראה שאתם אדם רגיש מאוד' : 'ייתכן שאתם לא אדם רגיש מאוד';
  const description = isHighlySensitive
    ? 'עניתם בחיוב על יותר מ-12 הגדים. יחד עם זאת חשוב לזכור שאף שאלון פסיכולוגי אינו מדויק כל כך ושאפשר לנהל את החיים גם בלי להסתמך עליו באופן מוחלט.'
    : 'עניתם על 12 או פחות הגדים בחיוב. זה לא אומר דבר מוחלט, והערכה רחבה יותר של תכונה זו מתבצעת בטווח ארוך יותר ובכלים מקצועיים.';
  const recommendation = 'מומלץ לקרוא את הספר "אדם רגיש מאוד" מאת ד"ר איליין ארון כדי להכיר מקרוב ובאופן נרחב את תכונת הרגישות הגבוהה.';

  resultContainer.style.display = 'block';
  resultContainer.style.background = '#ecfdf5';
  resultContainer.style.borderColor = '#d1fae5';
  resultContainer.style.color = '#065f46';
  resultContainer.innerHTML = `
    <strong>${title}</strong>
    <p>תשובות חיוביות: ${positiveCount} מתוך ${questions.length}.</p>
    <p>${description}</p>
    <p>${recommendation}</p>
  `;
}

submitButton.addEventListener('click', calculateResult);
buildQuestionnaire();
