interface OrderFormProps {
  onSubmit: (value: string) => void;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    onSubmit(username);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="username" />
      <button type="submit">Place order</button>
    </form>
  );
}

/**💡 Назва пропса (onSubmit, onOrder, onSend) може бути будь-якою – головне, щоб було зрозуміло, що він означає. Це ваш власний пропс, а не атрибут елемента form.


У компоненті App ми використовуємо OrderForm і передаємо в неї пропс onSubmit, який є функцією для обробки замовлення. */
