export const modalStyles = {
    position: 'absolute' as const,
    top: '50%' as const,
    left: '50%' as const,
    transform: 'translate(-50%, -50%)' as const,
    width: { xs: '90%', sm: '60%', md: '90%' } as const, 
    bgcolor: 'background.black' as const,
    boxShadow: 24 as const,
    borderRadius: 2 as const,
    maxHeight: '90vh' as const, 
    overflowY: 'auto' as const
};