import { DateField, EmailField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="name" />
            <EmailField source="email" />
            <DateField source="created_at" />
        </SimpleShowLayout>
    </Show>
);
